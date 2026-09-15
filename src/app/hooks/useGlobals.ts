import {
  createContext,
  useContext,
} from "react";

import type {
  BasketInterface,
} from "../../libs/types/basket";

import type {
  Member,
} from "../../libs/types/member";


interface GlobalInterface {

  /* AUTH */

  authMember: Member | null;

  setAuthMember:
  (member: Member | null) => void;

  authLoading: boolean;


  /* ORDER */

  orderBuilder: Date;

  setOrderBuilder:
  (input: Date) => void;


  /* BASKET */

  basket: BasketInterface;
}


export const GlobalContext =
  createContext<
    GlobalInterface | undefined
  >(undefined);


export const useGlobals = () => {

  const context =
    useContext(GlobalContext);


  if (
    context === undefined
  ) {

    throw new Error(
      "useGlobals must be used within ContextProvider",
    );
  }


  return context;
};