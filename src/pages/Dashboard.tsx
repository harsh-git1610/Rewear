
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const mockItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    category: 'Jackets',
    size: 'M',
    condition: 'Good',
    points: 25,
    image: 'https://images.unsplash.com/photo-1544966503-7cc4ac7b4ae5?w=300&h=400&fit=crop',
    user: 'Sarah M.',
    rating: 4.8,
    status: 'available'
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    category: 'Dresses',
    size: 'S',
    condition: 'Excellent',
    points: 30,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    user: 'Emma K.',
    rating: 5.0,
    status: 'available'
  },
  {
    id: '3',
    title: 'Designer Handbag',
    category: 'Accessories',
    size: 'One Size',
    condition: 'Like New',
    points: 45,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop',
    user: 'Lisa R.',
    rating: 4.9,
    status: 'available'
  },
  {
    id: '4',
    title: 'Cashmere Sweater',
    category: 'Sweaters',
    size: 'L',
    condition: 'Good',
    points: 35,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop',
    user: 'Maya T.',
    rating: 4.7,
    status: 'available'
  },
  {
    id: '5',
    title: 'Leather Boots',
    category: 'Shoes',
    size: '8',
    condition: 'Good',
    points: 40,
    image: 'https://images.unsplash.com/photo-1608256246200-53e8b47b9909?w=300&h=400&fit=crop',
    user: 'Alex P.',
    rating: 4.6,
    status: 'available'
  },
  {
    id: '6',
    title: 'Silk Scarf',
    category: 'Accessories',
    size: 'One Size',
    condition: 'Excellent',
    points: 20,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=400&fit=crop',
    user: 'Sophie L.',
    rating: 4.9,
    status: 'available'
  }
];

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Discover amazing items from our community or list your own.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Points</CardTitle>
              <CardDescription>Available for redemption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">
                {user?.points}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Items Listed</CardTitle>
              <CardDescription>Your active listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Successful Swaps</CardTitle>
              <CardDescription>Total completed exchanges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">7</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
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
          {filteredItems.map((item) => (
            <Link key={item.id} to={`/item/${item.id}`} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
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
                    className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-600"
                  >
                    {item.points} pts
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{item.category}</span>
                    <span>Size {item.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500">Listed by {item.user}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/add-item">List Your First Item</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
