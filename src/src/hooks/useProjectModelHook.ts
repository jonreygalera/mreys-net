import { useMemo } from "react";
import ProjectModel from "../lib/models/projectModel"
import IProject from "../interface/IProject";

export const useProjectModelHook = (params: { key: string, value?: any }) => {

  return useMemo(() => {
    const projectModel = (new ProjectModel).getWithTechStacks();

    return {
      data: projectModel as IProject[],
      ok: true
    };
  }, [params]);
  
}