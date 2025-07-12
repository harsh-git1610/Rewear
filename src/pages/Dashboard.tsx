
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid, List, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/listings")
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Filter listings based on search and category
  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/listings/${id}`);
    setListings(listings.filter(item => item._id !== id));
  };

  // For editing, you can open a modal or navigate to an edit page.
  // Here’s a simple inline edit example:
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', price: '', image: '' });

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:5000/api/listings/${editingId}`, editData);
    setListings(listings.map(item => item._id === editingId ? { ...item, ...editData } : item));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover amazing items from our community or list your own.
          </p>
        </div>
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg dark:text-white">Your Points</CardTitle>
              <CardDescription className="dark:text-gray-300">Available for redemption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {user?.points}
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg dark:text-white">Items Listed</CardTitle>
              <CardDescription className="dark:text-gray-300">Your active listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg dark:text-white">Successful Swaps</CardTitle>
              <CardDescription className="dark:text-gray-300">Total completed exchanges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">7</div>
            </CardContent>
          </Card>
        </div>
        {/* Search and Filters */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Jackets">Jackets</SelectItem>
                  <SelectItem value="Dresses">Dresses</SelectItem>
                  <SelectItem value="Sweaters">Sweaters</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Items Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredListings.map((item) => (
            <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-48'}`}
                />
                <div className="absolute top-3 right-3">
                  <Heart className="h-5 w-5 text-white/80 hover:text-red-500 cursor-pointer" />
                </div>
                <Badge 
                  className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-600 dark:bg-emerald-500"
                >
                  {item.price ? `${item.price} pts` : 'No Price'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>{item.category || 'Uncategorized'}</span>
                  <span>{item.size ? `Size ${item.size}` : ''}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                    {item.condition || 'N/A'}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">{item.rating || 'N/A'}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Listed by {item.user || 'Unknown'}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => startEdit(item)}>Edit</Button>
                  <Button onClick={() => handleDelete(item._id)} variant="destructive">Delete</Button>
                </div>
                {editingId === item._id && (
                  <div className="mt-2 space-y-2">
                    <input
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      placeholder="Title"
                      className="block w-full"
                    />
                    <input
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      className="block w-full"
                    />
                    <input
                      name="price"
                      value={editData.price}
                      onChange={handleEditChange}
                      placeholder="Price"
                      className="block w-full"
                    />
                    <input
                      name="image"
                      value={editData.image}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                      className="block w-full"
                    />
                    <Button onClick={handleEditSave} className="mt-2">Save</Button>
                    <Button onClick={() => setEditingId(null)} variant="outline" className="mt-2 ml-2">Cancel</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No items found matching your criteria.</p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600" asChild>
              <Link to="/add-item">List Your First Item</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
