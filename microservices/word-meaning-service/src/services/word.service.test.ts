import * as service from './word.service';
import * as db from '../utils/fileDb';
import { WordEntry } from '../models/word.model';

jest.mock('../utils/fileDb');

const mockedReadWords = db.readWords as jest.Mock;
const mockedWriteWords = db.writeWords as jest.Mock;

describe('Word Service', () => {

  beforeEach(() => {
    mockedReadWords.mockClear();
    mockedWriteWords.mockClear();
  });

  test('should return all words', async () => {
    const mockWords: WordEntry[] = [{ word: 'test', meanings: ['exam'] }];
    mockedReadWords.mockResolvedValue(mockWords);

    const result = await service.getAllWords();
    expect(result).toEqual(mockWords);
  });

  test('should get word by name', async () => {
    const mockWords: WordEntry[] = [{ word: 'hello', meanings: ['greeting'] }];
    mockedReadWords.mockResolvedValue(mockWords);

    const result = await service.getWord('hello');
    expect(result).toEqual(mockWords[0]);
  });

  test('should create word entry', async () => {
    mockedReadWords.mockResolvedValue([]);
    const newWord: WordEntry = { word: 'new', meanings: ['something new'] };

    await service.createWord(newWord);

    expect(mockedWriteWords).toHaveBeenCalledWith([newWord]);
  });

  test('should update word meanings', async () => {
    const existingWord: WordEntry = { word: 'update', meanings: ['old'] };
    mockedReadWords.mockResolvedValue([existingWord]);

    const success = await service.updateWord('update', ['new meaning']);
    expect(success).toBe(true);
    expect(mockedWriteWords).toHaveBeenCalledWith([{ word: 'update', meanings: ['new meaning'] }]);
  });

  test('should delete word', async () => {
    const mockWords: WordEntry[] = [{ word: 'delete', meanings: ['remove'] }];
    mockedReadWords.mockResolvedValue(mockWords);

    const success = await service.deleteWord('delete');
    expect(success).toBe(true);
    expect(mockedWriteWords).toHaveBeenCalledWith([]);
  });

});
