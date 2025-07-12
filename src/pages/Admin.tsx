
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Admin = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/listings")
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAccept = async (id) => {
    await axios.patch(`http://localhost:5000/api/listings/${id}/accept`);
    setListings(listings.map(l => l._id === id ? { ...l, status: "accepted" } : l));
  };

  const handleReject = async (id) => {
    const adminReview = prompt("Enter rejection reason (optional):");
    await axios.patch(`http://localhost:5000/api/listings/${id}/reject`, { adminReview });
    setListings(listings.map(l => l._id === id ? { ...l, status: "rejected", adminReview } : l));
  };

  // Filter and search
  const filtered = listings.filter(l =>
    (statusFilter === "all" || l.status === statusFilter) &&
    (l.title.toLowerCase().includes(search.toLowerCase()) ||
     l.user?.toLowerCase().includes(search.toLowerCase()))
  );

  // Count by status
  const counts = {
    pending: listings.filter(l => l.status === "pending").length,
    accepted: listings.filter(l => l.status === "accepted").length,
    rejected: listings.filter(l => l.status === "rejected").length,
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Listings</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by title or user"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending ({counts.pending})</option>
          <option value="accepted">Accepted ({counts.accepted})</option>
          <option value="rejected">Rejected ({counts.rejected})</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(listing => (
          <Card key={listing._id} className="bg-white rounded shadow p-4">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-40 object-cover rounded cursor-pointer"
              onClick={() => setSelected(listing)}
            />
            <CardContent>
              <h3 className="font-bold mt-2">{listing.title}</h3>
              <p className="text-xs text-gray-500">By: {listing.user || "Unknown"}</p>
              <p>Status: <span className={
                listing.status === "pending" ? "text-yellow-600" :
                listing.status === "accepted" ? "text-green-600" :
                "text-red-600"
              }>{listing.status}</span></p>
              <p className="text-xs text-gray-400">Created: {new Date(listing.createdAt).toLocaleString()}</p>
              {listing.adminReview && (
                <p className="text-xs text-gray-500">Review: {listing.adminReview}</p>
              )}
              {listing.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleAccept(listing._id)} className="bg-green-600 text-white">Accept</Button>
                  <Button onClick={() => handleReject(listing._id)} className="bg-red-600 text-white">Reject</Button>
                </div>
              )}
              <Button onClick={() => setSelected(listing)} variant="outline" className="mt-2">Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setSelected(null)}>×</button>
            <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
            <img src={selected.image} alt={selected.title} className="w-full h-60 object-cover rounded mb-2" />
            <p><b>Description:</b> {selected.description}</p>
            <p><b>User:</b> {selected.user}</p>
            <p><b>Status:</b> {selected.status}</p>
            {selected.adminReview && <p><b>Admin Review:</b> {selected.adminReview}</p>}
            <p className="text-xs text-gray-400 mt-2">Created: {new Date(selected.createdAt).toLocaleString()}</p>
            <div className="flex gap-2 mt-4">
              {selected.status === "pending" && (
                <>
                  <Button onClick={() => { handleAccept(selected._id); setSelected(null); }} className="bg-green-600 text-white">Accept</Button>
                  <Button onClick={() => { handleReject(selected._id); setSelected(null); }} className="bg-red-600 text-white">Reject</Button>
                </>
              )}
              <Button onClick={() => setSelected(null)} variant="outline">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
