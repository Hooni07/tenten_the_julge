import { BASE_URL } from './api';

interface ShopApplyProps {
  count: number;
  items: object[];
}

const getShopApply = async (
  shopId: string,
  noticeId: string,
): Promise<ShopApplyProps> => {
  const res = await fetch(
    `${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNjZmMDgwYy01MjY1LTRiNzAtODM2ZS0wZjEzNjBiNTcwMTAiLCJpYXQiOjE3MTM3Njg0MzN9.b4U8wYRaIyM1hJhcsPIaObWZX0k_JnSAOxvcY4YKd7o',
      },
    },
  );
  const result = await res.json();
  const { count, items } = result;

  if (result.status === 403) {
    throw new Error('권한이 없습니다.');
  } else if (result.status === 400) {
    throw new Error('요청 양식이 잘못되었습니다.');
  }
  return { count, items };
};

export default getShopApply;
