import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem, addOtherCost, deleteItem, deleteOtherCost, setItems, setOtherCosts,
} from '../features/projectSlice';
import { db } from '../firebase/firebase';
import {
  collection, query, where, getDocs,
  addDoc, deleteDoc, doc,
} from 'firebase/firestore';

import './CostManager.css';  // Import the CSS file

export default function CostManager({ user }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.project.items);
  const otherCosts = useSelector(state => state.project.otherCosts);

  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [otherDesc, setOtherDesc] = useState('');
  const [otherAmount, setOtherAmount] = useState('');

  const itemsCollection = collection(db, 'items');
  const otherCostsCollection = collection(db, 'otherCosts');

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const q1 = query(itemsCollection, where('uid', '==', user.uid));
      const itemsSnapshot = await getDocs(q1);
      const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setItems(itemsData));

      const q2 = query(otherCostsCollection, where('uid', '==', user.uid));
      const otherCostsSnapshot = await getDocs(q2);
      const otherCostsData = otherCostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setOtherCosts(otherCostsData));
    };
    fetchData();
  }, [user, dispatch, itemsCollection, otherCostsCollection]);

  const handleAddItem = async () => {
    if (!itemName || !itemCost) return alert('Fill item name and cost');
    const newItem = { name: itemName, cost: parseFloat(itemCost), uid: user.uid };
    const docRef = await addDoc(itemsCollection, newItem);
    dispatch(addItem({ ...newItem, id: docRef.id }));
    setItemName('');
    setItemCost('');
  };

  const handleAddOtherCost = async () => {
    if (!otherDesc || !otherAmount) return alert('Fill description and amount');
    const newCost = { description: otherDesc, amount: parseFloat(otherAmount), uid: user.uid };
    const docRef = await addDoc(otherCostsCollection, newCost);
    dispatch(addOtherCost({ ...newCost, id: docRef.id }));
    setOtherDesc('');
    setOtherAmount('');
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    dispatch(deleteItem(id));
  };

  const handleDeleteOtherCost = async (id) => {
    await deleteDoc(doc(db, 'otherCosts', id));
    dispatch(deleteOtherCost(id));
  };

  const totalItemsCost = items.reduce((sum, i) => sum + i.cost, 0);
  const totalOtherCosts = otherCosts.reduce((sum, c) => sum + c.amount, 0);
  const totalProjectCost = totalItemsCost + totalOtherCosts;

  return (
    <div className="cost-manager-container">
      <h2>Project Cost Tracker</h2>

      <div className="form-section">
        <h3>Add Item</h3>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={itemCost}
          onChange={e => setItemCost(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>

      <div className="table-section">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, name, cost }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{cost.toFixed(2)}</td>
                <td><button className="delete-btn" onClick={() => handleDeleteItem(id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-section">
        <h3>Add Other Cost</h3>
        <input
          type="text"
          placeholder="Description"
          value={otherDesc}
          onChange={e => setOtherDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={otherAmount}
          onChange={e => setOtherAmount(e.target.value)}
        />
        <button onClick={handleAddOtherCost}>Add</button>
      </div>

      <div className="table-section">
        <h3>Other Costs</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {otherCosts.map(({ id, description, amount }) => (
              <tr key={id}>
                <td>{description}</td>
                <td>{amount.toFixed(2)}</td>
                <td><button className="delete-btn" onClick={() => handleDeleteOtherCost(id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Total Project Cost: ₹{totalProjectCost.toFixed(2)}</h2>
    </div>
  );
}
