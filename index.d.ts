interface StudyLinkList {
  title: string;
  href: string;
}

interface StudyList {
  title: string;
  id: number;
  active: boolean;
}

type ElementType<T> = T extends (infer U)[] ? U : never;
