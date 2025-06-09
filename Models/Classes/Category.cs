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
    public class Category
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; }
    }
}
