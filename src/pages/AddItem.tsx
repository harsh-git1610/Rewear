
import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState(""); // Or get from auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/listings", {
      title,
      description,
      image,
      price,
      user
    });
    setTitle("");
    setDescription("");
    setImage("");
    setPrice("");
    setUser("");
    alert("Listing added!");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-lg shadow-lg dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add a New Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="block mb-1">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="block mb-1">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image" className="block mb-1">Image URL</Label>
              <Input
                id="image"
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="price" className="block mb-1">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="user" className="block mb-1">User</Label>
                <Input
                  id="user"
                  type="text"
                  placeholder="User"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Add Listing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddItem;
