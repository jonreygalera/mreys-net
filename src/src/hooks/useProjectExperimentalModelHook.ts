import { useMemo } from "react";
import IProject from "../interface/IProject";
import ProjectExperimentalModel from "../lib/models/projectModelExperimental";

export const useProjectExperimentalModelHook = (params: { key: string, value?: any }) => {

  return useMemo(() => {
    const projectModel = (new ProjectExperimentalModel).getWithTechStacks();

    return {
        data: projectModel as IProject[],
        ok: true
    };
  }, [params]);
  
}