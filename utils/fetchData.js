import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import Order from '../models/Order';
import User from '../models/User';

export const getAllProducts = async () => {
  try {
    await dbConnect();
    const countProducts = await Product.countDocuments().lean();
    const products = await Product.find({}).sort({ name: '1' }).limit(6).lean();
    return { products: JSON.stringify(products), countProducts };
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllUsers = async () => {
  try {
    await dbConnect();
    const users = await User.find({}).lean();
    return JSON.stringify(users);
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllProductsSlugs = async () => {
  try {
    await dbConnect();
    const slugs = await Product.find({}, 'slug').lean();
    return slugs;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductSlug = async (slug) => {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean();
    return JSON.stringify(product);
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const getUserId = async (id) => {
  try {
    await dbConnect();
    const user = await User.findOne({ _id: id }).lean();
    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const getOrderId = async (id) => {
  try {
    await dbConnect();
    const order = await Order.findOne({ _id: id }).lean();
    return JSON.stringify(order);
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const getOrdersByUserId = async (id) => {
  try {
    await dbConnect();
    const orders = await Order.find({ user: id }).lean();
    return JSON.stringify(orders);
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const getAllOrders = async () => {
  try {
    await dbConnect();
    const orders = await Order.find({}).populate('user', 'email').lean();
    return JSON.stringify(orders);
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const getAllDataAdmin = async () => {
  try {
    await dbConnect();
    const users = await User.countDocuments({}).lean();
    const orders = await Order.find({}).lean();
    const products = await Product.countDocuments({}).lean();

    return {
      orders: JSON.stringify(orders),
      users,
      products,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};
