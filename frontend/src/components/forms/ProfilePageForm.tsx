import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCredentials } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useUpdateProfileMutation } from "@/slices/UserApiSlice";
import { toast } from "react-toastify";

const ProfilePageForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    image?: string;
  }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPreviewImage(`http://localhost:8000/uploads/${userInfo.image}`);
  }, [userInfo]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file.",
        }));
        return;
      }
      // Validate size (<2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be under 2MB.",
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, image: undefined }));
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("_id", userInfo._id);
      formData.append("name", name);
      formData.append("email", email);
      if (image) {
        formData.append("image", image);
      }

      const res = await updateProfile(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full max-w-md mx-auto mt-10 border border-pink-400 rounded-lg p-6 shadow-sm bg-white"
    >
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <h1 className="text-2xl font-bold">Update Your Profile</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Update your TaskOrbit account
        </p>
      </div>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-6 relative group">
        {previewImage && (
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-pink-400 transition-transform duration-300 group-hover:scale-105"
          />
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-12 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-pink-600 transition opacity-0 group-hover:opacity-100"
        >
          Edit Image
        </button>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {errors.image && (
          <p className="text-red-500 text-xs mt-2">{errors.image}</p>
        )}
      </div>

      {/* Name Field */}
      <div className="grid gap-2 mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="grid gap-2 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full cursor-pointer">
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default ProfilePageForm;
