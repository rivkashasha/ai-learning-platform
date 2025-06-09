using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Classes
{
    public class SubCategory
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }

        [BsonElement("categoryId")]
        [Required]
        public ObjectId CategoryId { get; set; }
    }
}
