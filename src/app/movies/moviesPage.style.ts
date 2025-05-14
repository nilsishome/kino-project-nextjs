// MoviesPage.styles.ts
import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const title: SxProps<Theme> = {
  fontFamily: "initial",
  color: "#F1DDC5",
  fontWeight: 1000,
  fontSize: 30,
  marginBottom: 2,
  marginTop: 2,
};

export const list: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 2,
  width: '100%',
};

export const listItem: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: 'none',
  overflow: 'hidden',
  backgroundColor: 'none',
  borderRadius: 1,
};

export const image: SxProps<Theme> = {
  width: '100%',
  height: 300,
  objectFit: 'scale-down',
  marginTop: 4,
  
};

export const titleText: SxProps<Theme> = {
  padding: 0,
  textAlign: 'center',
  fontWeight: 500,
  fontSize: 20,
  color: 'black',
  marginTop: 2,
  marginBottom: 2,

  
};
