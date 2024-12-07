import IProject from "../../interface/IProject";
import projectExperimental from "../data/projectExpermental";
import Model from "./model";

class ProjectExperimentalModel extends Model
{
  data()
  {
    return projectExperimental as IProject[];
  }
}

export default ProjectExperimentalModel;
