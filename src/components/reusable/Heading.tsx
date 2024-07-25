import { Typography } from "@mui/material"
import React from "react";

interface HeadingProps {
  title: string;
  mb?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, mb = '1rem' }) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: { xs: '12px', sm: '16px', md: '18px' },
        color: 'rgba(255,255,255,.7)',
        fontWeight: '600',
        lineHeight: 1,
        textAlign: 'center',
        fontFamily: 'Roboto Condensed',
        marginBottom: mb,
      }}
    >
      {title}
    </Typography>
  )
}

export default Heading
