import IProjectTechStack from "../../interface/IProjectTechStack";
import projectTechStack from "../data/projectTechStack";
import Model from "./model";

class ProjectTechStackModel extends Model
{
  data()
  {
    return projectTechStack as IProjectTechStack[];
  }
}

export default ProjectTechStackModel;
