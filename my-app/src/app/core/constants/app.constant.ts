import {Currency} from "../models/currency.model";
import {CurrencyIsoCode} from "../enums/currency.enum";

export class AppConstants {
  public static API_ENDPOINT = 'http://127.0.0.1:6666/api/';

  public static CURRENCIES: Currency[] = [
    {iso_code: CurrencyIsoCode.AUD, name: 'Australian Dollar', symbol: 'A$'},
    {iso_code: CurrencyIsoCode.GBP, name: 'British Pound', symbol: '£'},
    {iso_code: CurrencyIsoCode.CAD, name: 'Canadian Dollar', symbol: 'CA$'},
    {iso_code: CurrencyIsoCode.EUR, name: 'European Euro', symbol: '€'},
    {iso_code: CurrencyIsoCode.HKD, name: 'Hong Kong Dollar', symbol: 'HK$'},
    {iso_code: CurrencyIsoCode.INR, name: 'Indian Rupee', symbol: '₹'},
    {iso_code: CurrencyIsoCode.JPY, name: 'Japanese Yen', symbol: '¥'},
    {iso_code: CurrencyIsoCode.SGD, name: 'Singapore Dollar', symbol: 'S$'},
    {iso_code: CurrencyIsoCode.CHF, name: 'Swiss Franc', symbol: ''},
    {iso_code: CurrencyIsoCode.USD, name: 'United States Dollar', symbol: '$'},
  ];

}
