/*
Copyright (c) 2017 Holvonix LLC and the json2array AUTHORS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const json2array = require("./index");

test("dottedGet gets the object", () => {
  expect(json2array.dottedGet({ a: "b", c: 1 }, "")).toEqual({ a: "b", c: 1 });
});

test("dottedGet gets a top-level property", () => {
  expect(json2array.dottedGet({ a: "b", c: 1 }, "a")).toEqual("b");
  expect(json2array.dottedGet({ a: "b", c: 1 }, "a.")).toEqual("b");
  expect(json2array.dottedGet({ a: "b", c: 1 }, "c")).toEqual(1);
  expect(
    json2array.dottedGet({ a: "b", c: 1, d: { z: "b", c: 1 } }, "d")
  ).toEqual({ z: "b", c: 1 });
});

test("dottedGet gets a second-level property", () => {
  expect(
    json2array.dottedGet({ a: "b", c: 1, d: { z: "b", c: 1 } }, "d.z")
  ).toEqual("b");
  expect(
    json2array.dottedGet({ a: "b", c: 1, d: { z: "b", c: 1 } }, "d.z.")
  ).toEqual("b");
  expect(
    json2array.dottedGet({ a: "b", c: 1, d: { z: "b", c: 1 } }, "d.c.")
  ).toEqual(1);
});

test("map2array gets a top-level property", () => {
  expect(json2array.map2array([{ a: "b", c: 1 }], ["a"])).toEqual([["b"]]);
});

test("map2array gets a top-level property from many objects", () => {
  expect(
    json2array.map2array([{ a: "b", c: 1 }, { a: "dd", c: 1 }], ["a"])
  ).toEqual([["b"], ["dd"]]);
});

test("map2array gets many deep property from many objects", () => {
  expect(
    json2array.map2array(
      [
        { a: "b3ioj3ior", c: 1, d: { z: "bmf mf", c: { z: "b", c: 1 } } },
        { a: "b", c: "b94", d: { z: "bz", c: { z: "fkmef", c: 91 } } },
        { a: "bij4", c: 293, d: { z: "b3", c: { z: "39", c: 13 } } }
      ],
      ["a", "d.z", "d.c.z", "d.c", "c"]
    )
  ).toEqual([
    ["b3ioj3ior", "bmf mf", "b", { z: "b", c: 1 }, 1],
    ["b", "bz", "fkmef", { z: "fkmef", c: 91 }, "b94"],
    ["bij4", "b3", "39", { z: "39", c: 13 }, 293]
  ]);
});
