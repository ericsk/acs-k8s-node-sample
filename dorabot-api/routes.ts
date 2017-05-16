import * as character from './controllers/character';

/**
 * Set URL routing.
 * @param server The restify server instance.
 */
export function setRoutes(server) {
    server.get('/q/:character', character.queryEntity);
}