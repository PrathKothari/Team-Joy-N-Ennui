import FarmerComponent from "@/components/FarmerComponent";
const page = () => {
  return (
    <div className="px-[10%]">
      {farmersData.map((farmer, index) => {
        return (
          <FarmerComponent
            key={index}
            name={farmer.name}
            contact={farmer.contact}
            email={farmer.email}
          />
        );
      })}
    </div>
  );
};

export default page;
const farmersData = [
  {
    name: "John Doe",
    contact: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    contact: "234-567-8901",
    email: "jane.smith@example.com",
  },
  {
    name: "Alice Johnson",
    contact: "345-678-9012",
    email: "alice.johnson@example.com",
  },
  {
    name: "Bob Brown",
    contact: "456-789-0123",
    email: "bob.brown@example.com",
  },
  {
    name: "Charlie Green",
    contact: "567-890-1234",
    email: "charlie.green@example.com",
  },
  {
    name: "Diana White",
    contact: "678-901-2345",
    email: "diana.white@example.com",
  },
];
