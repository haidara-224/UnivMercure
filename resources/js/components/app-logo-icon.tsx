import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppLogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Vous pouvez ajouter d'autres props personnalisées ici si nécessaire
}

const AppLogoIcon: React.FC<AppLogoIconProps> = (props) => {
  return (
    <img {...props} src="/mercure.jpeg" alt="Mercure" />
  );
};

export default AppLogoIcon;
