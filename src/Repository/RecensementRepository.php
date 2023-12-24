<?php

namespace App\Repository;

use App\Entity\Recensement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Recensement>
 *
 * @method Recensement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recensement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recensement[]    findAll()
 * @method Recensement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecensementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recensement::class);
    }

//    /**
//     * @return Recensement[] Returns an array of Recensement objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Recensement
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
