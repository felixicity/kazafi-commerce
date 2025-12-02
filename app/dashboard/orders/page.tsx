import { MOCK_ORDERS } from "@/lib/store/cart-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrderHistoryView: React.FC = () => (
      <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Order History</h2>
            <Card className="p-0 overflow-hidden">
                  <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                    <tr>
                                          <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Order ID
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Date
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Status
                                          </th>
                                          <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Total
                                          </th>
                                          <th className="px-6 py-3"></th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                    {MOCK_ORDERS.map((order) => (
                                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                      {order.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                      {order.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                      <Badge>{order.status}</Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">
                                                      ${order.total.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                      <Button variant="link" className="p-0">
                                                            Details <ChevronRight size={14} className="inline ml-1" />
                                                      </Button>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </Card>
      </div>
);

export default OrderHistoryView;
