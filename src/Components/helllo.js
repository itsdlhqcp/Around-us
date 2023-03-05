// import React, { useState } from "react";

// function Dashboard() {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleSelectItem = (item) => {
//     setSelectedItem(item);
//     setDrawerOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={() => setDrawerOpen(!drawerOpen)}>
//         {drawerOpen ? "Close Drawer" : "Open Drawer"}
//       </button>
//       {drawerOpen && (
//         <div>
//           <h2>Content</h2>
//           <ul>
//             <li onClick={() => handleSelectItem("Item 1")}>Item 1</li>
//             <li onClick={() => handleSelectItem("Item 2")}>Item 2</li>
//             <li onClick={() => handleSelectItem("Item 3")}>Item 3</li>
//           </ul>
//         </div>
//       )}
//       {selectedItem && (
//         <div>
//           <h2>Selected Item: {selectedItem}</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
