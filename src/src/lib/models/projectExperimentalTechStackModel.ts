import IProjectTechStack from "../../interface/IProjectTechStack";
import projectExperimentalStack from "../data/projectExperimentalStack";
import Model from "./model";

class ProjectExperimentalTechStackModel extends Model
{
  data()
  {
    return projectExperimentalStack as IProjectTechStack[];
  }
}

export default ProjectExperimentalTechStackModel;
