// src/utils/canister_idl.js
export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    updateScore: IDL.Func([IDL.Text, IDL.Nat], [], []),
    getScores: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], ["query"]),
  });
};
