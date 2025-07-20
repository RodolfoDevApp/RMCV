export interface ConceptItem {
  id: string;
  name: string;
  icon: string;
}

export interface ConceptGroup {
  id: string;
  name: string;
  icon: string;
  items: ConceptItem[];
}
