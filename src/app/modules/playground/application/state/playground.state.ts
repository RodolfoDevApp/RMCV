import { computed, Injectable, signal } from '@angular/core';
import { ConceptGroup, ConceptItem } from '../../domain/models/concept/concept.model';
import { ButtonConfig } from '../../domain/models/configurations/button-config.model';
import { LoadConceptGroupsUseCase } from '../services/load-concepts.usecase';
import { LoadButtonConfigUseCase } from '../services/load-button-config.usecase';
import { InputConfig } from '../../domain/models/configurations/input-config.model';
import { LoadInputConfigUseCase } from '../services/load-input-config.usecase';
import { IconConfig } from '../../domain/models/configurations/icon-config.model';
import { LoadIconConfigUseCase } from '../services/load-icon-config.usecase';
import { CardConfig } from '../../domain/models/configurations/card-config.model';
import { LoadCardConfigUseCase } from '../services/load-card-config.usecase';
import { ModalConfig } from '../../domain/models/configurations/modal-config.model';
import { LoadModalConfigUseCase } from '../services/load-modal-config.usecase';
import { FieldDefinition, FormConfig } from '../../domain/models/configurations/form-config.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from '../../domain/models/concept/location.model';
import { LoadFormDefinitionUseCase } from '../services/load-form-config.usecase';
import { LoadCountriesUseCase } from '../services/load-countries.usecase';
import { LoadStatesUseCase } from '../services/load-states.usecase';
import { LoadCitiesUseCase } from '../services/load-cities.usecase';


@Injectable({ providedIn: 'root' })
export class PlaygroundState {
  readonly groups = signal<ConceptGroup[]>([]);
  readonly selectedConcept = signal<ConceptItem | null>(null);
  readonly sidebarExpanded = signal(true);
  readonly buttonConfig = signal<ButtonConfig | null>(null);
  private readonly loadConceptGroupsUseCase = new LoadConceptGroupsUseCase();
  private readonly loadButtonConfigUseCase = new LoadButtonConfigUseCase();
  readonly inputConfig = signal<InputConfig | null>(null);
  private loadInputConfigUseCase = new LoadInputConfigUseCase();
  readonly iconConfig = signal<IconConfig | null>(null);
  private loadIconConfigUseCase = new LoadIconConfigUseCase();
  readonly cardConfig = signal<CardConfig | null>(null);
  private loadCardConfigUseCase = new LoadCardConfigUseCase();
  readonly modalConfig = signal<ModalConfig | null>(null);
  private loadModalCfg = new LoadModalConfigUseCase();
  readonly modalVisible = signal(false);
  readonly formConfig = signal<FormConfig | null>(null);
  readonly formGroup = signal<FormGroup | null>(null);
  readonly options = signal<Record<string, Option[]>>({});

  private loadFormDef = new LoadFormDefinitionUseCase();
  private loadCountries = new LoadCountriesUseCase();
  private loadStates = new LoadStatesUseCase();
  private loadCities = new LoadCitiesUseCase();

  loadConceptGroups() {
    this.loadConceptGroupsUseCase.execute().subscribe(groups => {
      this.groups.set(groups);
    });
  }

  selectConcept(concept: ConceptItem) {
    this.selectedConcept.set(concept);
    if (concept.id === 'button') this.loadButtonConfig();
    else if (concept.id === 'input') this.loadInputConfig();
    else if (concept.id === 'icon') this.loadIconConfig();
    else if (concept.id === 'card') this.loadCardConfig();
    else if (concept.id === 'modal') this.loadModalConfig();

  }

  toggleSidebar() {
    this.sidebarExpanded.update(current => !current);
  }
  //area de boton
  loadButtonConfig() {
    this.loadButtonConfigUseCase.execute().subscribe(cfg => {
      this.buttonConfig.set(cfg);
    });
  }

  updateButtonConfig(update: Partial<ButtonConfig>) {
    this.buttonConfig.update(current => ({ ...current!, ...update }));
  }
  //area de input 


  loadInputConfig() {
    this.loadInputConfigUseCase.execute().subscribe(cfg => {
      this.inputConfig.set(cfg);
    });
  }

  updateInputConfig(update: Partial<InputConfig>) {
    this.inputConfig.update(current => ({ ...current!, ...update }));
  }
  loadIconConfig() {
    this.loadIconConfigUseCase.execute().subscribe(cfg => {
      this.iconConfig.set(cfg);
    });
  }

  updateIconConfig(update: Partial<IconConfig>) {
    this.iconConfig.update(curr => ({ ...curr!, ...update }));
  }

  loadCardConfig() {
    this.loadCardConfigUseCase.execute().subscribe(cfg => {
      this.cardConfig.set(cfg);
    });
  }

  updateCardConfig(update: Partial<CardConfig>) {
    this.cardConfig.update(curr => ({ ...curr!, ...update }));
  }
  loadModalConfig() {
    this.loadModalCfg.execute().subscribe((cfg: ModalConfig | null) => this.modalConfig.set(cfg));
  }

  updateModalConfig(update: Partial<ModalConfig>) {
    this.modalConfig.update(curr => ({ ...curr!, ...update }));
  }
  hideModalConfig() {
    this.modalConfig.set(null);
  }
  /** Mostrar el modal */
  showModal() {
    this.modalVisible.set(true);
  }
  /** Ocultar el modal */
  hideModal() {
    this.modalVisible.set(false);
  }

  loadForm() {
    this.loadFormDef.execute().subscribe(def => {
      this.formConfig.set(def);
      const group: any = {};
      def.fields.forEach((f: FieldDefinition) => {
        const ctrls = [];
        if (f.required) ctrls.push(Validators.required);
        if (f.type === 'email') ctrls.push(Validators.email);
        if (f.type === 'number') ctrls.push(Validators.pattern(/^\d+$/));
        group[f.name] = new FormControl(null, ctrls);
      });
      this.formGroup.set(new FormGroup(group));

      // carga paises
      this.loadCountries.execute().subscribe((list: any) => {
        this.options.update(o => ({ ...o, country: list }));
      });
    });
  }

  /** Invocado al cambiar country */
  selectCountry(country: string) {
    this.loadStates.execute(country).subscribe((list: any) => {
      this.options.update(o => ({ ...o, state: list }));
      this.formGroup()!.get('state')!.reset();
      this.formGroup()!.get('city')!.reset();
    });
  }

  /** Invocado al cambiar state */
  selectState(state: string) {
    this.loadCities.execute(state).subscribe((list: any) => {
      this.options.update(o => ({ ...o, city: list }));
      this.formGroup()!.get('city')!.reset();
    });
  }
  updateFormDefinition(def: FormConfig) {
    // 1. Actualizamos la definición
    this.formConfig.set(def);

    // 2. Reconstruimos el FormGroup con los campos nuevos
    const groupControls: Record<string, FormControl> = {};
    def.fields.forEach(f => {
      const ctrls = [];
      if (f.required) ctrls.push(Validators.required);
      if (f.type === 'email') ctrls.push(Validators.email);
      if (f.type === 'number') ctrls.push(Validators.pattern(/^\d+$/));
      groupControls[f.name] = new FormControl(null, ctrls);
    });

    this.formGroup.set(new FormGroup(groupControls));
  }

  /** Computeds para facilitar el binding */
  isModalOpen = computed(() => this.modalVisible());
  currentModalConfig = computed(() => this.modalConfig());
}