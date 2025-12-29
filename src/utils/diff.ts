import * as jsondiffpatch from 'jsondiffpatch';

export const diffEngine = jsondiffpatch.create({
  objectHash: (obj: any) => JSON.stringify(obj),
});
