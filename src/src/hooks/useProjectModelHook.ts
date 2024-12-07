import { useMemo } from "react";
import ProjectModel from "../lib/models/projectModel"
import IProject from "../interface/IProject";

export const useProjectModelHook = (params: { key: string, value?: any }) => {

  return useMemo(() => {
    const projectModel = (new ProjectModel).build()

    if(params.key != 'all') {
      projectModel.where(params.key, params.value);
    }
    return {
      data: projectModel.toRaw() as IProject[],
      ok: true
    };
  }, [params]);
  
}