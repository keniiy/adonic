import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BadRequestException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class FileNotFoundException extends Exception {
  constructor(message: string = 'File not found!') {
    super(message, 404, 'E_FILE_NOTE_FOUND')
    this.message = message
  }
}
