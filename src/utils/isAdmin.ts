const ADMIN_EMAILS = ["vanshved2022@gmail.com"];

export const isAdmin = (email: string | undefined): boolean => {
    
  return !!email && ADMIN_EMAILS.includes(email);
};
