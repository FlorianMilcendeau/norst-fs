import test from "ava";
import { readFile, readFileAsync } from "../index.js";
import fileMock from "./mocks/fs.json" with { type: 'json' };

const fileMockPath = "./__test__/mocks/fs.json";
const unknownPath = "./__test__/unknown.js";

test.serial("Read file synchrone", (t) => {
  const fileContent = readFile(fileMockPath);
  t.deepEqual(JSON.parse(fileContent.toString()), fileMock);
});

test("Read file synchrone - should throw an error if reading fails", (t) => {
  const error = t.throws(() => readFile(unknownPath));
  t.is(error.code, "GenericFailure");
});

test.serial("Read file asynchrone", async (t) => {
  const fileContent = await readFileAsync(fileMockPath);
  t.deepEqual(JSON.parse(fileContent.toString()), fileMock);
});

test("Read file asynchrone - should throw an error if reading fails", async (t) => {
  const error = await t.throwsAsync(readFileAsync(unknownPath));
  t.is(error.code, "GenericFailure");
});
