// Imports 

import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken'; 
import { createAuthToken } from '../src/utils/createAuthToken.js';  // Adapte le chemin si nécessaire

describe('createAuthToken', () => {
  let jwtSignStub;

  // Avant chaque test

  beforeEach(() => {
    // Stub la fonction jwt.sign pour éviter d'appeler l'API réelle
    jwtSignStub = sinon.stub(jwt, 'sign');
  });

  // Après chaque test - remise à zéro

  afterEach(() => {
    jwtSignStub.restore();
  });

  it('devrait générer un token valide avec les bons paramètres', () => {
    const id = '123';
    const role = 'user';
    const family_id = '456';
    const association_id = '789';

    const expectedPayload = {
      id,
      role,
      family_id,
      association_id
    };

    const fakeToken = 'fake.jwt.token';
    jwtSignStub.returns(fakeToken);  // Simule le token généré

    // Act - Appel à la fonction

    const token = createAuthToken(id, role, family_id, association_id);

    // Assert - Vérifications

    expect(jwtSignStub.calledOnce).to.be.true;  // Assure-toi que jwt.sign a été appelé une fois
    expect(jwtSignStub.calledWith(expectedPayload, process.env.JWT_SECRET, { expiresIn: '3h' })).to.be.true;
    expect(token).to.equal(fakeToken);  // Vérifie que le token généré est celui du stub
  });

  it('devrait générer un token valide sans family_id si non fourni', () => {
    const id = '123';
    const role = 'user';
    const family_id = undefined;  // Pas de family_id
    const association_id = '789';

    const expectedPayload = {
      id,
      role,
      association_id
    };

    const fakeToken = 'fake.jwt.token';
    jwtSignStub.returns(fakeToken);  // Simule le token généré

    const token = createAuthToken(id, role, family_id, association_id);

    expect(jwtSignStub.calledOnce).to.be.true;
    expect(jwtSignStub.calledWith(expectedPayload, process.env.JWT_SECRET, { expiresIn: '3h' })).to.be.true;
    expect(token).to.equal(fakeToken);
  });

  it('devrait générer un token valide sans association_id si non fourni', () => {
    const id = '123';
    const role = 'user';
    const family_id = '456';
    const association_id = undefined;  // Pas d'association_id

    const expectedPayload = {
      id,
      role,
      family_id
    };

    const fakeToken = 'fake.jwt.token';
    jwtSignStub.returns(fakeToken);  // Simule le token généré

    const token = createAuthToken(id, role, family_id, association_id);

    expect(jwtSignStub.calledOnce).to.be.true;
    expect(jwtSignStub.calledWith(expectedPayload, process.env.JWT_SECRET, { expiresIn: '3h' })).to.be.true;
    expect(token).to.equal(fakeToken);
  });

  it('devrait lancer une erreur si jwt.sign échoue', () => {
    const id = '123';
    const role = 'user';
    const family_id = '456';
    const association_id = '789';
  
    // Simuler une erreur dans jwt.sign en utilisant throws
    jwtSignStub.throws(new Error('JWT signing error'));
  
    // Vérifier que l'appel à createAuthToken lève bien l'erreur
    expect(() => createAuthToken(id, role, family_id, association_id)).to.throw('JWT signing error');
  });
})

