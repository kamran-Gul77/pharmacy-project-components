interface NavItem {
  title: string;
  url: string;
  icon: StaticImageData;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface siderbarMenus {
  user: User;
  navMain: NavItem[];
}
