import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search, AlertTriangle, X, Package } from "lucide-react";
import { Button, Input, Textarea, Select, Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Modal } from "@/components/admin/ui";
import GlideSelect from "@/components/react-bits/Inputs/GlideSelect";
import { initialProducts, categoryOptions, type AdminProduct, type ProductVariant } from "@/components/admin/adminData";

interface FormErrors {
  name?: string;
  sku?: string;
  pricePerDay?: string;
  stock?: string;
  imageAlt?: string;
}

export function AdminCatalog() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
      const matchesStock =
        stockFilter === "All" ||
        (stockFilter === "low" && p.stock > 0 && p.stock <= p.lowStockThreshold) ||
        (stockFilter === "out" && p.stock === 0);
      return matchesSearch && matchesCat && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const openAdd = () => {
    setEditingProduct(null);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setErrors({});
    setModalOpen(true);
  };

  const validate = (data: Partial<AdminProduct>): FormErrors => {
    const e: FormErrors = {};
    if (!data.name || data.name.trim().length < 2) e.name = "Product name must be at least 2 characters.";
    if (!data.sku || data.sku.trim().length < 3) e.sku = "SKU must be at least 3 characters.";
    else {
      const dup = products.find((p) => p.sku.toLowerCase() === data.sku!.toLowerCase() && p.id !== editingProduct?.id);
      if (dup) e.sku = "SKU must be unique. This SKU already exists.";
    }
    if (data.pricePerDay === undefined || data.pricePerDay <= 0) e.pricePerDay = "Price must be a positive number.";
    if (data.stock === undefined || data.stock < 0) e.stock = "Stock must be 0 or greater.";
    if (!data.imageAlt || data.imageAlt.trim().length < 5) e.imageAlt = "Alt text must be at least 5 characters for accessibility.";
    return e;
  };

  const handleSave = (formData: Partial<AdminProduct>) => {
    const e = validate(formData);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...editingProduct, ...formData } as AdminProduct : p)));
    } else {
      const newProduct: AdminProduct = {
        id: `p${Date.now()}`,
        name: formData.name || "",
        brand: formData.brand || "",
        category: formData.category || "Mirrorless",
        pricePerDay: formData.pricePerDay || 0,
        sku: formData.sku || "",
        stock: formData.stock ?? 0,
        lowStockThreshold: formData.lowStockThreshold ?? 2,
        image: formData.image || "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        imageAlt: formData.imageAlt || "",
        description: formData.description || "",
        available: (formData.stock ?? 0) > 0,
        variants: formData.variants || [],
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>Catalog &amp; Inventory</h1>
          <p className="mt-1 text-[13px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Manage products, stock levels, variants, and pricing.</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Product
        </Button>
      </div>

      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 backdrop-blur-sm" role="status">
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" aria-hidden="true" />
          <p className="text-[13px] text-amber-200">
            {outOfStockCount > 0 && <span className="font-semibold">{outOfStockCount} out of stock</span>}
            {outOfStockCount > 0 && lowStockCount > 0 && " and "}
            {lowStockCount > 0 && <span className="font-semibold">{lowStockCount} low stock</span>}
            {" — review and restock soon."}
          </p>
        </div>
      )}

      <Card>
        <div className="relative z-20 flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, SKU, or brand..."
              aria-label="Search products"
              className="w-full rounded-full border border-white/15 bg-sky-950/40 py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-sky-950/25 px-3 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur-md hover:bg-sky-950/40 hover:text-white transition-all duration-300">
            <span className="pl-1 text-[13px] font-medium text-white/90" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.6)" }}>Category</span>
            <GlideSelect
              options={[{ value: "All", label: "All Categories" }, ...categoryOptions.map((c) => ({ value: c.value, label: c.label }))]}
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
              ariaLabel="Filter by category"
              showTags={false}
              accentColor="#f5f5f5"
              surfaceColor="rgba(12,30,55,0.6)"
              highlightColor="rgba(30,60,100,0.8)"
              textColor="#f5f5f5"
              size="sm"
              radius={10}
              menuWidth={160}
              placement="bottom"
              align="left"
              popDuration={180}
              glideDuration={220}
              rememberPosition
              className="[filter:drop-shadow(0_8px_24px_rgba(0,15,35,0.2))]"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-sky-950/25 px-3 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur-md hover:bg-sky-950/40 hover:text-white transition-all duration-300">
            <span className="pl-1 text-[13px] font-medium text-white/90" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.6)" }}>Stock</span>
            <GlideSelect
              options={[{ value: "All", label: "All Stock" }, { value: "low", label: "Low Stock" }, { value: "out", label: "Out of Stock" }]}
              value={stockFilter}
              onChange={(value) => setStockFilter(value)}
              ariaLabel="Filter by stock level"
              showTags={false}
              accentColor="#f5f5f5"
              surfaceColor="rgba(12,30,55,0.6)"
              highlightColor="rgba(30,60,100,0.8)"
              textColor="#f5f5f5"
              size="sm"
              radius={10}
              menuWidth={140}
              placement="bottom"
              align="left"
              popDuration={180}
              glideDuration={220}
              rememberPosition
              className="[filter:drop-shadow(0_8px_24px_rgba(0,15,35,0.2))]"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => {
              const isLow = product.stock > 0 && product.stock <= product.lowStockThreshold;
              const isOut = product.stock === 0;
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.imageAlt} className="h-12 w-16 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-white/50">{product.brand}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><span className="font-mono text-xs text-white/60">{product.sku}</span></TableCell>
                  <TableCell><span className="text-white/80">{product.category}</span></TableCell>
                  <TableCell><span className="font-semibold text-white">${product.pricePerDay}</span></TableCell>
                  <TableCell>
                    <span className={`font-semibold ${isOut ? "text-red-400" : isLow ? "text-amber-400" : "text-white"}`}>{product.stock}</span>
                  </TableCell>
                  <TableCell>
                    {product.variants.length > 0 ? (
                      <span className="text-xs text-white/60">{product.variants.length} variant{product.variants.length > 1 ? "s" : ""}</span>
                    ) : (
                      <span className="text-xs text-white/30">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isOut ? <Badge variant="danger">Out of Stock</Badge> : isLow ? <Badge variant="warning">Low Stock</Badge> : <Badge variant="success">Available</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(product)}
                        className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto h-10 w-10 text-white/20" aria-hidden="true" />
            <p className="mt-3 text-[13px] text-white/50">No products found matching your filters.</p>
          </div>
        )}
      </Card>

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          errors={errors}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <Modal
          open={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Product"
          footer={
            <>
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </Button>
            </>
          }
        >
          <p className="text-[13px] text-white/70">
            Are you sure you want to delete <span className="font-semibold text-white">{deleteTarget.name}</span> (SKU: {deleteTarget.sku})?
            This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
}

function ProductFormModal({
  product,
  errors,
  onClose,
  onSave,
}: {
  product: AdminProduct | null;
  errors: FormErrors;
  onClose: () => void;
  onSave: (data: Partial<AdminProduct>) => void;
}) {
  const [name, setName] = useState(product?.name || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "Mirrorless");
  const [pricePerDay, setPricePerDay] = useState(product?.pricePerDay?.toString() || "");
  const [sku, setSku] = useState(product?.sku || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "0");
  const [lowStockThreshold, setLowStockThreshold] = useState(product?.lowStockThreshold?.toString() || "2");
  const [image, setImage] = useState(product?.image || "");
  const [imageAlt, setImageAlt] = useState(product?.imageAlt || "");
  const [description, setDescription] = useState(product?.description || "");
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      brand,
      category: category as AdminProduct["category"],
      pricePerDay: parseFloat(pricePerDay) || 0,
      sku,
      stock: parseInt(stock) || 0,
      lowStockThreshold: parseInt(lowStockThreshold) || 0,
      image: image || "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
      imageAlt,
      description,
      variants,
    });
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { id: `v${Date.now()}`, name: "", value: "", stock: 0, sku: "" }]);
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: string | number) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={product ? "Edit Product" : "Add New Product"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="product-form">{product ? "Save Changes" : "Add Product"}</Button>
        </>
      }
    >
      <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Product Name" name="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} required />
          <Input label="Brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" name="category" value={category} onChange={(e) => setCategory(e.target.value as AdminProduct["category"])}>
            {categoryOptions.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>
          <Input label="Price Per Day ($)" name="pricePerDay" type="number" min="0" step="1" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} error={errors.pricePerDay} required />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input label="SKU" name="sku" value={sku} onChange={(e) => setSku(e.target.value)} error={errors.sku} required />
          <Input label="Stock Level" name="stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} error={errors.stock} required />
          <Input label="Low Stock Threshold" name="lowStockThreshold" type="number" min="0" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(e.target.value)} />
        </div>

        <Input label="Image URL" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        <Input label="Image Alt Text (for accessibility)" name="imageAlt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} error={errors.imageAlt} placeholder="Describe the product image for screen readers" required />
        <Textarea label="Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Variants (sizes, colors, kits)</label>
            <Button type="button" size="sm" variant="secondary" onClick={addVariant}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add Variant
            </Button>
          </div>
          {variants.length === 0 ? (
            <p className="mt-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-white/50">No variants added. The product will use the base stock level.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {variants.map((v) => (
                <li key={v.id} className="grid grid-cols-12 gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
                  <input
                    type="text"
                    value={v.name}
                    onChange={(e) => updateVariant(v.id, "name", e.target.value)}
                    placeholder="Name (e.g. Body Only)"
                    aria-label="Variant name"
                    className="col-span-3 rounded-md border border-white/15 bg-sky-950/40 px-2 py-1.5 text-xs text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none [color-scheme:dark]"
                  />
                  <input
                    type="text"
                    value={v.value}
                    onChange={(e) => updateVariant(v.id, "value", e.target.value)}
                    placeholder="Value (e.g. Body only)"
                    aria-label="Variant value"
                    className="col-span-4 rounded-md border border-white/15 bg-sky-950/40 px-2 py-1.5 text-xs text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none [color-scheme:dark]"
                  />
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                    placeholder="Variant SKU"
                    aria-label="Variant SKU"
                    className="col-span-2 rounded-md border border-white/15 bg-sky-950/40 px-2 py-1.5 text-xs font-mono text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none [color-scheme:dark]"
                  />
                  <input
                    type="number"
                    min="0"
                    value={v.stock}
                    onChange={(e) => updateVariant(v.id, "stock", parseInt(e.target.value) || 0)}
                    placeholder="Stock"
                    aria-label="Variant stock"
                    className="col-span-2 rounded-md border border-white/15 bg-sky-950/40 px-2 py-1.5 text-xs text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none [color-scheme:dark]"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(v.id)}
                    className="col-span-1 flex items-center justify-center rounded-md text-white/40 transition-colors hover:bg-red-500/15 hover:text-red-300"
                    aria-label="Remove variant"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </Modal>
  );
}
