using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace Org.OpenAPITools.Model {

  /// <summary>
  /// 
  /// </summary>
  [DataContract]
  public class GetMealPlanWeek200ResponseDaysInnerNutritionSummary {
    /// <summary>
    /// Gets or Sets Nutrients
    /// </summary>
    [DataMember(Name="nutrients", EmitDefaultValue=false)]
    [JsonProperty(PropertyName = "nutrients")]
    public List<GetMealPlanWeek200ResponseDaysInnerNutritionSummaryNutrientsInner> Nutrients { get; set; }


    /// <summary>
    /// Get the string presentation of the object
    /// </summary>
    /// <returns>String presentation of the object</returns>
    public override string ToString()  {
      var sb = new StringBuilder();
      sb.Append("class GetMealPlanWeek200ResponseDaysInnerNutritionSummary {\n");
      sb.Append("  Nutrients: ").Append(Nutrients).Append("\n");
      sb.Append("}\n");
      return sb.ToString();
    }

    /// <summary>
    /// Get the JSON string presentation of the object
    /// </summary>
    /// <returns>JSON string presentation of the object</returns>
    public string ToJson() {
      return Newtonsoft.Json.JsonConvert.SerializeObject(this, Newtonsoft.Json.Formatting.Indented);
    }

}
}
