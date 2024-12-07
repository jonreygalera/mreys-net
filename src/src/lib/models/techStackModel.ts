import ITechStack from "../../interface/ITechStack";
import techStackData from '../data/techStack.json';
import Model from "./model";

class TechStackModel extends Model
{
  data()
  {
    return techStackData as ITechStack[];
  }
}

export default TechStackModel;
