const size = {
  laptopsSmall: "1300px",
  tablets: "750px",
  mobileL: "550px",
  mobileS: "400px",
};

export const device = {
  laptopsSmall: `(max-width: ${size.laptopsSmall})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablets: `(max-width: ${size.tablets})`,
  mobileS: `(max-width: ${size.mobileS})`,
};
