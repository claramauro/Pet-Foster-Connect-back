// Imports 

import { expect } from 'chai';
import nock from 'nock';
import { geocodeAddress } from '../src/utils/geocodeAdress.js' // Remplace par le bon chemin

describe('geocodeAddress', function() {
  const address = '1600 Pennsylvania Ave NW, Washington, DC 20500'; // Exemple d'adresse

  afterEach(() => {
    // Après chaque test, nettoyer les nocks pour éviter les interférences
    nock.cleanAll();
  });

  it('should return correct latitude and longitude for a valid address', async function() {
    const mockedResponse = [
      {
        lat: '38.8976763',
        lon: '-77.0365298'
      }
    ];

    nock('https://nominatim.openstreetmap.org')
      .get('/search')
      .query({
        format: 'json',
        q: encodeURIComponent(address),
        addressdetails: '1',
        limit: '1'
      })
      .reply(200, mockedResponse);

    const result = await geocodeAddress(address);

    // Arrondir les valeurs à 7 décimales pour les comparer
    
    const roundedLatitude = parseFloat(result.latitude.toFixed(7));
    const roundedLongitude = parseFloat(result.longitude.toFixed(7));

    // Vérification que la latitude et la longitude sont correctes après arrondi

    expect(roundedLatitude).to.equal(38.8976763);
    expect(roundedLongitude).to.equal(-77.0365298);
  });

  it('should throw an error if no result is found for the address', async function() {
    nock('https://nominatim.openstreetmap.org')
      .get('/search')
      .query({
        format: 'json',
        q: encodeURIComponent(address),
        addressdetails: '1',
        limit: '1'
      })
      .reply(200, []);

    try {
      await geocodeAddress(address);
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal('Aucun résultat trouvé pour cette adresse.');
    }
  });

  it('should handle API errors gracefully', async function() {
    nock('https://nominatim.openstreetmap.org')
      .get('/search')
      .query({
        format: 'json',
        q: encodeURIComponent(address),
        addressdetails: '1',
        limit: '1'
      })
      .replyWithError('Request failed');

    try {
      await geocodeAddress(address);
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.include('Erreur inconnue lors du géocodage');
    }
  });
});
