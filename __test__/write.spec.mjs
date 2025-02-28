import test from "ava";
import { readFile, writeFile, writeFileAsync } from "../index.js";
import fileMock from "./mocks/fs.json" with { type: 'json' };

const fileMockPath = "./__test__/mocks/fs.json";
const unknownFolderPath = "./__test__/folder/unknown.js";

test.afterEach.always(() => {
  fileMock.age = 30;
  writeFile(fileMockPath, Buffer.from(JSON.stringify(fileMock)));
});

test.serial("Write file synchrone", (t) => {
  const copyMock = { ...fileMock };
  copyMock.age = 25;

  t.notThrows(() => writeFile(fileMockPath, Buffer.from(JSON.stringify(copyMock))));

  const fileContent = readFile(fileMockPath);
  t.is(JSON.parse(fileContent.toString()).age, 25);
});

test("Write file synchrone - should throw an error if writing fails", (t) => {
  const copyMock = { ...fileMock };
  copyMock.age = 25;

  const error = t.throws(() => writeFile(unknownFolderPath, Buffer.from(JSON.stringify(copyMock))));

  t.is(error.code, "GenericFailure");
});

test.serial("Write file asynchrone", async (t) => {
  const copyMock = { ...fileMock };
  copyMock.age = 28;

  await writeFileAsync(fileMockPath, Buffer.from(JSON.stringify(copyMock)));

  const fileContent = readFile(fileMockPath);
  t.is(JSON.parse(fileContent.toString()).age, 28);
});

test("Write file asynchrone - should throw an error if writing fails", async (t) => {
  const copyMock = { ...fileMock };
  copyMock.age = 25;

  const error = await t.throwsAsync(writeFileAsync(unknownFolderPath, Buffer.from(JSON.stringify(copyMock))));

  t.is(error.code, "GenericFailure");
});
