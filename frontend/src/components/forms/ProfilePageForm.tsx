import { useState, useEffect } from "react";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated");
    } catch (err : any) {
        toast.error(err?.data?.message || err.error || "Something went wrong")
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
          Update to your TaskOrbit account
        </p>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* {isLoading} */}

        <Button type="submit" className="w-full cursor-pointer">
          Update
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"></div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePageForm;
