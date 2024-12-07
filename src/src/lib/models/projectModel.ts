import IProject from "../../interface/IProject";
import project from "../data/project";
import Model from "./model";

class ProjectModel extends Model
{
  data()
  {
    return project as IProject[];
  }
}

export default ProjectModel;
