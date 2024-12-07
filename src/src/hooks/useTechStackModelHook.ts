import { useMemo } from "react";
import TechStackModel from "../lib/models/techStackModel"
import ITechStack from "../interface/ITechStack";

export const useTechStackModelHook = (params: { key: string, value?: any }) => {

  return useMemo(() => {
    const techStackModel = (new TechStackModel).build()

    if(params.key != 'all') {
      techStackModel.where(params.key, params.value);
    }
    return {
      data: techStackModel.toRaw() as ITechStack[],
      ok: true
    };
  }, [params]);
  
}