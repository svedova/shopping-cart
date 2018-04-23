import { fetchItems } from "@/views/List/actions/list";
import mocks from "@/tests/mocks";
import { LIST_FETCH_ITEMS } from "@/redux/types";

describe("(reducer) list", () => {
  test("should fetch items", done => {
    const item = mocks.items.all[1];
    const dispatch = jest.fn();
    const results = [{ data: () => item }];
    const get = jest.fn().mockReturnValue(Promise.resolve(results));
    const collection = jest.fn().mockReturnValue({ get });
    const firestore = jest.fn().mockReturnValue({ collection });
    global.firebase = { firestore };
    fetchItems()(dispatch).then(() => {
      expect(collection).toHaveBeenCalledWith("items");
      expect(get).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: LIST_FETCH_ITEMS,
        items: [item]
      });
      expect(item.discounted).toBe(0.43);
      done();
    });
  });
});
