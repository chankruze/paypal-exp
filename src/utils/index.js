/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Nov 15 2020 02:24:17 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

export const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
