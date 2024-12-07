import { useMemo } from "react";
import IProject from "../interface/IProject";
import ProjectExperimentalModel from "../lib/models/projectModelExperimental";

export const useProjectExperimentalModelHook = (params: { key: string, value?: any }) => {

  return useMemo(() => {
    const projectModel = (new ProjectExperimentalModel).build()

    if(params.key != 'all') {
      projectModel.where(params.key, params.value);
    }
    return {
      data: projectModel.toRaw() as IProject[],
      ok: true
    };
  }, [params]);
  
}