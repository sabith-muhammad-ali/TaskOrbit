import ProfilePageForm from '../forms/ProfilePageForm'

const ProfilePage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm   ">
        <ProfilePageForm />
      </div>
    </div>  )
}

export default ProfilePage