"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

interface CountryDetails {
  capital: string[];
  name: CountryInfo;
}

interface CountryInfo {
  common: string;
  official: string;
  nativeName: NativeNames;
}
interface NativeNames {
  [key: string]: LanguageDetails;
}

interface LanguageDetails {
  official: string;
  common: string;
}

const CountriesAPI = () => {
  const [countries, setCountries] = useState<CountryDetails[]>([]);
  const getCountriesInfo = async () => {
    const response = await axios.get(
      //"https://restcountries.com/v3.1/all?fields=capital"
      "https://restcountries.com/v3.1/all?fields=name,capital"
    );
    console.log(response.data);
    if (response.data) {
      setCountries(response.data);
    }
  };
  useEffect(() => {
    getCountriesInfo();
  }, []);

  return (
    <>
      <div>Countries API</div>
      {countries.map((country, index) => (
        <Card
          key={`${country.capital[0]}_${index}`}
          style={{ height: "15rem", width: "20rem" }}
        >
          <div key={`${country.capital[0]}_${index}`}>
            <p>Capital:{country.capital[0]}</p>

            <p>Country name: {country.name.common}</p>
            {Object.entries(country.name.nativeName).map(([key, value]) => (
              <>
                <div key={key}>
                  <p>
                    {key}: {value.common}
                  </p>
                  <p>
                    {key}: {value.official}
                  </p>
                </div>
              </>
            ))}
          </div>
        </Card>
      ))}
    </>
  );
};
export default CountriesAPI;
