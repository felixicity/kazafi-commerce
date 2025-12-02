import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_COUPONS } from "@/lib/store/cart-store";

const CouponsView: React.FC = () => (
      <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Saved Coupons</h2>
            <div className="grid gap-6 md:grid-cols-2">
                  {MOCK_COUPONS.map((coupon, index) => (
                        <Card
                              key={index}
                              className={`flex justify-between items-center ${!coupon.valid ? "opacity-50" : ""}`}
                        >
                              <div>
                                    <p className="text-xl font-extrabold text-black tracking-widest">{coupon.code}</p>
                                    <p className="text-sm text-gray-700 font-semibold">{coupon.discount} Discount</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                          {coupon.valid ? `Expires: ${coupon.expiry}` : "Expired"}
                                    </p>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                    <Badge>{coupon.valid ? "Delivered" : "Cancelled"}</Badge>
                                    {coupon.valid && (
                                          <Button variant="outline" className="text-xs">
                                                Copy Code
                                          </Button>
                                    )}
                              </div>
                        </Card>
                  ))}
            </div>
      </div>
);

export default CouponsView;
