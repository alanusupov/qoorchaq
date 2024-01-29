export const getCountryPrice = country => {
  console.log(country);
  switch (country.toLowerCase()) {
    case "kyrgyzstan":
      return 0;
    case "kazakhstan":
    case "russian federation":
    case "uzbekiztan":
    case "turkmenistan":
    case "china":
    case "turkey":
    case "belarus":
    case "armenia":
    case "ukraine":
      return 50;

    case "tajikistan":
      return 500;
    default:
      return 100;
  }
};
